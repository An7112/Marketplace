
import { useHistory } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };

    return ( 

        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label style={{marginRight: '30px', marginLeft: '15px'}} htmlFor="header-search">
                <span  className="visually-hidden"> 
                    Search product
                </span>
            </label>
            <input style={{width:'75%',height:'40px', marginRight: '30px', marginBottom:'50px', borderRadius:'7px', border:'3px solid #00b4cc', outline:'none'}}

                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}

                type="text"
                id="header-search"
                placeholder="Search product"
                name="s"
            />
            <button style={{width:'5.9%',height:'40px', marginRight: '30px', marginBottom:'50px', borderRadius:'7px', border:'3px solid #00b4cc', outline:'none', backgroundColor:'white'}} type="submit" >Search</button>
        </form>
    );
};

export default SearchBar;
