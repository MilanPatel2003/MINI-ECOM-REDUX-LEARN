import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchProducts } from "@/features/products/ProductSlice";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

const categoryOptions = [
  { label: "All Categories", value: "" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((state: RootState) => state.ProductReducer);
    const itemsPerPage = 8;
    const [currPage, setCurrPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Filter the full product list
    const filteredProducts = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || item.category === selectedCategory)
    );

    // Update totalPages based on filtered products
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Get current paginated products from the filtered list
    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Handle page change
    const HandlePageChange = (page: number) => {
        // Reset to first page when search term changes
        if (searchTerm !== "" && page !== 1) {
             setCurrPage(1);
        } else {
             setCurrPage(page);
        }
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrPage(1); 
    };

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setCurrPage(1);
    };

    if (status === 'loading') {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Our Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} className="w-[300px] h-[400px]" />
                    ))}
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto p-4">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
             <h1 className="text-3xl font-bold mb-6">Our Products</h1>

            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full sm:max-w-sm"
                    aria-label="Search Product"
                />
                <div className="w-full sm:max-w-sm">
                    <Combobox
                        options={categoryOptions}
                        value={selectedCategory}
                        onValueChange={handleCategoryChange}
                        placeholder="Select category..."
                    />
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                 <div className="text-center text-gray-500 text-xl mt-8">No products found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Only show pagination if there are filtered products */}
            {filteredProducts.length > 0 && (
                <Pagination
                    currPage={currPage}
                    totalPages={totalPages}
                    onPageChange={HandlePageChange}
                />
            )}
        </div>
    );
}

export default Products;