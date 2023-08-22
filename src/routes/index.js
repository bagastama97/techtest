import { Route, Routes } from "react-router-dom";
import Filter from "../pages/filter";
import ListPage from "../pages/list";
import ListFilter from "../pages/listFilter";
import Maps from "../pages/maps";
import SearchLocation from "../pages/searchLocation";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/listfilter" element={<ListFilter />} />
      <Route path="/location" element={<SearchLocation />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
}
