import {Link} from "react-router-dom";
export default function Header() {

    return(
        <>
            <div className="">
                <div className="">
                    Bibliothek
                </div>
            </div>
            <div className="">
                <Link to={""}>Books</Link>
            </div>
        </>
    )


}