import CategorySidebar from '@/app/components/CategorySidebar';

interface Type {
    children: any
}

const ProductsLayout: React.FC<Type> = ({ children }) => {
    return (
        <div className="container mx-auto flex gap-6 p-4">
            <aside className="w-64 hidden md:block">
                <CategorySidebar />
            </aside>
            <main className="flex-1">{children}</main>
        </div>
    );
}

export default ProductsLayout