import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                    CampusTrade
                </Link>
                <div className="space-x-4">
                    <Link href="/sell" className="text-gray-600 hover:text-gray-900">
                        Sell
                    </Link>
                    <Link href="/login" className="text-gray-600 hover:text-gray-900">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
