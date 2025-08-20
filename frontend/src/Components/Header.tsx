import {Link} from "react-router-dom";
export default function Header() {

    return(
        <>
            <div className="bg-gray-800 shadow-md">

                <div className="container mx-10 flex justify-between items-center p-4">
                    <div className="text-2xl font-bold text-gray-200 tracking-wide">
                        Bibliothek
                    </div>
                </div>

                <nav className="bg-gray-700 border-t border-gray-600 shadow-lg shadow-gray-800 dark:shadow-gray-900   mb-8">
                    <div className="container mx-10 flex space-x-8 px-6">
                        <Link to={"/"}
                              className="py-3 text-gray-200 font-medium border-b-2 border-transparent hover:text-amber-700 hover:border-white transition">
                            Bücher
                        </Link>
                        <Link to={"/add"}
                              className="py-3 text-gray-200 font-medium border-b-2 border-transparent hover:text-amber-700 hover:border-white transition">
                            Bücher hinzufügen
                        </Link>
                    </div>
                </nav>

            </div>

        </>
    )



}