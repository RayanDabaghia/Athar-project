// src/TestPage.jsx  ← ملف مؤقت للتجربة بس، منمسحه بعدين
import FilterSearchBar from "./components/FilterSearchBar";

export default function TestPage() {
    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
            <FilterSearchBar onApply={(filters) => console.log(filters)} />
        </div>
    );
}