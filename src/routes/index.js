import { Route, Routes } from "react-router-dom";
import Filter from "../pages/filter";
import ListPage from "../pages/list";
import Maps from "../pages/maps";
import SearchLocation from "../pages/searchLocation";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Filter />} />
      <Route path="/location" element={<SearchLocation />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
}
