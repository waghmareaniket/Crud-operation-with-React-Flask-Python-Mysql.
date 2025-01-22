import React, { useState } from "react";
import "./App.css";
const App = () => {
  // State for Country
  const [countryData, setCountryData] = useState([]);
  const [countryFormVisible, setCountryFormVisible] = useState(false);
  const [countryFormData, setCountryFormData] = useState({});
  const [showCountryTable, setShowCountryTable] = useState(false);

  // State for Language
  const [languageData, setLanguageData] = useState([]);
  const [languageFormVisible, setLanguageFormVisible] = useState(false);
  const [languageFormData, setLanguageFormData] = useState({});
  const [showLanguageTable, setShowLanguageTable] = useState(false);

  // State for Category
  const [categoryData, setCategoryData] = useState([]);
  const [categoryFormVisible, setCategoryFormVisible] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({});
  const [showCategoryTable, setShowCategoryTable] = useState(false);

  // Loading and Error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Function for all Tables
  const fetchData = async (type) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://127.0.0.1:5000/${type}`);
      const result = await response.json();
      if (type === "countries") setCountryData(result);
      if (type === "languages") setLanguageData(result);
      if (type === "categories") setCategoryData(result);
    } catch {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Save for Country, Language, and Category
  const handleSaveData = async (e, type, formData) => {
    e.preventDefault();
    const isEdit = !!formData[`${type}_id`];
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:5000/${type}/${formData[`${type}_id`]}` 
      : `http://127.0.0.1:5000/${type}`;
    
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchData(type);
      if (type === "countries") setCountryFormVisible(false);
      if (type === "languages") setLanguageFormVisible(false);
      if (type === "categories") setCategoryFormVisible(false);
      if (type === "countries") setCountryFormData({});
      if (type === "languages") setLanguageFormData({});
      if (type === "categories") setCategoryFormData({});
    } catch {
      alert(`Failed to save ${type} data.`);
    }
  };

  // Handle Delete for Country, Language, and Category
  const handleDeleteData = async (id, type) => {
    try {
      await fetch(`http://127.0.0.1:5000/${type}/${id}`, {
        method: "DELETE",
      });
      fetchData(type);
    } catch {
      alert(`Failed to delete ${type}.`);
    }
  };

  // Handle Edit for Country, Language, and Category
  const handleEditData = (row, type) => {
    if (type === "countries") {
      setCountryFormData(row);
      setCountryFormVisible(true);
    }
    if (type === "languages") {
      setLanguageFormData(row);
      setLanguageFormVisible(true);
    }
    if (type === "categories") {
      setCategoryFormData(row);
      setCategoryFormVisible(true);
    }
  };

  // Add New Country, Language, or Category
  const handleAddNewData = (type) => {
    if (type === "countries") {
      setCountryFormData({});
      setCountryFormVisible(true);
    }
    if (type === "languages") {
      setLanguageFormData({});
      setLanguageFormVisible(true);
    }
    if (type === "categories") {
      setCategoryFormData({});
      setCategoryFormVisible(true);
    }
  };

  const toggleTable = (type) => {
    if (type === "countries") {
      setShowCountryTable(true);
      setShowLanguageTable(false);
      setShowCategoryTable(false);
      fetchData("countries");
    }
    if (type === "languages") {
      setShowLanguageTable(true);
      setShowCountryTable(false);
      setShowCategoryTable(false);
      fetchData("languages");
    }
    if (type === "categories") {
      setShowCategoryTable(true);
      setShowCountryTable(false);
      setShowLanguageTable(false);
      fetchData("categories");
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <button onClick={() => toggleTable('countries')}>Country</button><br/>
        <button onClick={() => toggleTable('languages')}>Language</button>
        <button onClick={() => toggleTable('categories')}>Category</button>
      </aside>

      <main className="content">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* Country Form */}
        {countryFormVisible && (
          <form onSubmit={(e) => handleSaveData(e, "countries", countryFormData)}>
            <div>
              <label>Country Name</label>
              <input
                type="text"
                value={countryFormData.country || ""}
                onChange={(e) => setCountryFormData({ ...countryFormData, country: e.target.value })}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setCountryFormVisible(false)}>Cancel</button>
          </form>
        )}

        {/* Language Form */}
        {languageFormVisible && (
          <form onSubmit={(e) => handleSaveData(e, "languages", languageFormData)}>
            <div>
              <label>Language Name</label>
              <input
                type="text"
                value={languageFormData.language || ""}
                onChange={(e) => setLanguageFormData({ ...languageFormData, language: e.target.value })}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setLanguageFormVisible(false)}>Cancel</button>
          </form>
        )}

        {/* Category Form */}
        {categoryFormVisible && (
          <form onSubmit={(e) => handleSaveData(e, "categories", categoryFormData)}>
            <div>
              <label>Category Name</label>
              <input
                type="text"
                value={categoryFormData.category || ""}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, category: e.target.value })}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setCategoryFormVisible(false)}>Cancel</button>
          </form>
        )}

        {/* Country Table */}
        {showCountryTable && countryData.length > 0 && (
          <div>
            <button onClick={() => handleAddNewData("countries")}>Add New Country</button>
            <table>
              <thead>
                <tr>
                  {Object.keys(countryData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {countryData.map((row) => (
                  <tr key={row.country_id}>
                    {Object.values(row).map((val, idx) => (
                      <td key={idx}>{val}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEditData(row, "countries")}>Edit</button>
                      <button onClick={() => handleDeleteData(row.country_id, "countries")}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Language Table */}
        {showLanguageTable && languageData.length > 0 && (
          <div>
            <button onClick={() => handleAddNewData("languages")}>Add New Language</button>
            <table>
              <thead>
                <tr>
                  {Object.keys(languageData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {languageData.map((row) => (
                  <tr key={row.language_id}>
                    {Object.values(row).map((val, idx) => (
                      <td key={idx}>{val}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEditData(row, "languages")}>Edit</button>
                      <button onClick={() => handleDeleteData(row.language_id, "languages")}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Category Table */}
        {showCategoryTable && categoryData.length > 0 && (
          <div>
            <button onClick={() => handleAddNewData("categories")}>Add New Category</button>
            <table>
              <thead>
                <tr>
                  {Object.keys(categoryData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((row) => (
                  <tr key={row.category_id}>
                    {Object.values(row).map((val, idx) => (
                      <td key={idx}>{val}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEditData(row, "categories")}>Edit</button>
                      <button onClick={() => handleDeleteData(row.category_id, "categories")}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
export default App;

