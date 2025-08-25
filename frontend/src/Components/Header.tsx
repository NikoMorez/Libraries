import {Link} from "react-router-dom";

type HeaderProps = Readonly<{
    user: string | null | undefined;
    onLogout: () => void;
    onLogin: () => void;
}>;

export default function Header({ user, onLogout, onLogin }: HeaderProps) {

    return(
        <>
            <div className="bg-gray-800 shadow-md">

                <div className="container mx-10 flex justify-between items-center p-4">
                    <div className="text-2xl font-bold text-gray-200 tracking-wide">
                        Bibliothek
                    </div>
                </div>

                <nav className="bg-gray-700 border-t border-gray-600 shadow-lg shadow-gray-800 dark:shadow-gray-900   mb-8">
                    <div className="mx-10 flex space-x-8 px-6 items-center">
                        <Link to={"/"}
                              className="py-3 text-gray-200 font-medium border-b-2 border-transparent hover:text-amber-700 hover:border-white transition">
                            Bücher
                        </Link>
                        <Link to={"/books/add"}
                              className="py-3 text-gray-200 font-medium border-b-2 border-transparent hover:text-amber-700 hover:border-white transition">
                            Bücher hinzufügen
                        </Link>

                        {user ? (
                            <button
                                onClick={onLogout}
                                className="w-28 ml-auto inline-flex items-center justify-center h-8 px-3 text-sm font-medium leading-none text-gray-800 border dark:text-gray-200 border-gray-500 rounded-md hover:bg-gray-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={onLogin}
                                className="w-28 ml-auto inline-flex items-center justify-center h-8 px-3 text-sm font-medium leading-none text-gray-800 dark:text-gray-200 border border-gray-500 rounded-md hover:bg-gray-600 transition"
                            >
                                Login
                            </button>
                        )}

                    </div>
                </nav>

            </div>

        </>
    )



}