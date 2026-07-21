import { useNavigate } from "react-router-dom";
const SearchResultList = ({search,bikes=[],onSearchChange}) => {
    const navigate = useNavigate();
    
  if (!search) return null;

  const filtered = bikes.filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="result-list">
      {filtered.length > 0 ? (
        filtered.map((bike) => <div key={bike._id} onClick={() => 
            {navigate(`/booking/${bike._id}`)
    onSearchChange("");}}>
       <img src={`/${bike.image}`} alt={bike.name} className="result-thumbnail" />
        {bike.name}</div>)
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};
export default SearchResultList;