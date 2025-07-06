import "./BrowsePage.css";
import productsData from "../../data/products.json";
import AccordionFilter from "../../components/accordion-filter/AccordionFilter";
import CheckboxFilter from "../../components/checkbox-filter/CheckboxFilter";
import ProductCard from "../../components/product-card/ProductCard";
import { useState, useEffect, useMemo } from "react";
import Button from "../../components/button/Button"

export default function BrowsePage({ product }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price-low-high");
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    origin: [],
    priceRanges: [],
    organic: false,
    inStock: false,
    brands: [],
  });

  const filterCounts = useMemo(() => {
    const counts = {
      category: {},
      origin: {},
      priceRanges: {},
      brands: {}
    };

    const countProducts = (filterType, value) => {
      return products.filter(p => {

        if(searchQuery && p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        if (filters.category.length > 0 && filterType !== 'category') {
          const productCategory = Object.keys(productsData.products).find(cat => 
            productsData.products[cat].some(prod => prod.id === p.id)
          );
          if (!filters.category.includes(productCategory)) return false;
        }

        if (filters.origin.length > 0 && filterType !== 'origin') {
          if (!filters.origin.includes(p.origin)) return false;
        }

        if (filters.priceRanges.length > 0 && filterType !== 'priceRanges') {
          const matchesPriceRange = filters.priceRanges.some(range => {
            const [min, max] = range.split('-').map(Number);
            if (range.endsWith('+')) {
              return p.price >= Number(range.replace('+', ''));
            }
            return p.price >= min && p.price <= max;
          });
          if (!matchesPriceRange) return false;
        }

        if (filters.organic && filterType !== 'organic') {
          if (!p.organic) return false;
        }

        if (filters.inStock && filterType !== 'inStock') {
          if (p.stock <= 0) return false;
        }

        if (filters.brands.length > 0 && filterType !== 'brands') {
          if (!filters.brands.includes(p.brand)) return false;
        }

        switch (filterType) {
          case 'category':
            {
            const cat = Object.keys(productsData.products).find(c => 
              productsData.products[c].some(prod => prod.id === p.id)
            );
            return cat === value;}
          case 'origin':
            return p.origin === value;
          case 'priceRanges':
            {
            const [min, max] = value.split('-').map(Number);
            if (value.endsWith('+')) {
              return p.price >= Number(value.replace('+', ''));
            }
            return p.price >= min && p.price <= max;
            }
          case 'brands':
            return p.brand === value;
          default:
            return true;
        }
      }).length;
    };

    productsData.facets.category.forEach(category => {
      counts.category[category] = countProducts('category', category);
    });

    productsData.facets.origin.forEach(origin => {
      counts.origin[origin] = countProducts('origin', origin);
    });

    productsData.facets.priceRanges.forEach(range => {
      counts.priceRanges[range] = countProducts('priceRanges', range);
    });

    productsData.facets.brand.forEach(brand => {
      counts.brands[brand] = countProducts('brands', brand);
    });

    return counts;
  }, [products, filters, searchQuery]);

  useEffect(() => {
    if (product) {
      setFilters((prev) => ({
        ...prev,
        category: [product],
        origin: [],
        priceRanges: [],
        brands: [],
      }));
    }
  }, [product]);

  useEffect(() => {
    const allProducts = Object.values(productsData.products).flat();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setSortedProducts(allProducts);
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category.length > 0) {
      result = result.filter((product) => {
        const productCategory = Object.keys(productsData.products).find((cat) =>
          productsData.products[cat].some((p) => p.id === product.id)
        );
        return filters.category.includes(productCategory);
      });
    }

    if (filters.origin.length > 0) {
      result = result.filter((product) =>
        filters.origin.includes(product.origin)
      );
    }

    if (filters.priceRanges.length > 0) {
      result = result.filter((product) => {
        return filters.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          if (range.endsWith("+")) {
            return product.price >= Number(range.replace("+", ""));
          }
          return product.price >= min && product.price <= max;
        });
      });
    }

    if (filters.organic) {
      result = result.filter((product) => product.organic);
    }

    if (filters.inStock) {
      result = result.filter((product) => product.stock > 0);
    }

    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    setFilteredProducts(result);
  }, [filters, products, searchQuery]);

  useEffect(() => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        break;
    }

    setSortedProducts(sorted);
  }, [sortOption, filteredProducts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "organic" || filterType === "inStock") {
        return { ...prev, [filterType]: !prev[filterType] };
      }

      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value],
      };
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="browse-page-container">
      <div className="browse-page-filters">
      <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <Button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              X
            </Button>
          )}
        </div>
        <hr/>
        {!product && (
          <>
            <AccordionFilter title="Categories">
              {productsData.facets.category.map((category) => (
                <CheckboxFilter
                  key={category}
                  id={`category-${category}`}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  checked={filters.category.includes(category)}
                  count={filterCounts.category[category]}
                  onChange={() => handleFilterChange("category", category)}
                />
              ))}
            </AccordionFilter>
            <hr />
          </>
        )}

        <AccordionFilter title="Brands">
          {productsData.facets.brand.map((brand) => (
            <CheckboxFilter
              key={brand}
              id={`brand-${brand}`}
              label={brand}
              count={filterCounts.brands[brand]}
              checked={filters.brands.includes(brand)}
              onChange={() => handleFilterChange("brands", brand)}
            />
          ))}
        </AccordionFilter>
        <hr />

        <AccordionFilter title="Origin">
          {productsData.facets.origin.map((origin) => (
            <CheckboxFilter
              key={origin}
              id={`origin-${origin}`}
              label={origin}
              checked={filters.origin.includes(origin)}
              count={filterCounts.origin[origin]}
              onChange={() => handleFilterChange("origin", origin)}
            />
          ))}
        </AccordionFilter>
        <hr />
        <AccordionFilter title="Price Range">
          {productsData.facets.priceRanges.map((range) => (
            <CheckboxFilter
              key={range}
              id={`price-${range}`}
              label={range.replace("-", " - ").replace("+", "+")}
              count={filterCounts.priceRanges[range]}
              checked={filters.priceRanges.includes(range)}
              onChange={() => handleFilterChange("priceRanges", range)}
            />
          ))}
        </AccordionFilter>

      </div>
      <div className="browse-page-products">
        <div className="browse-page-products-header">
          <div>
            <h2 className="products-title">
              {product
                ? product.toUpperCase().replace("_", " ")
                : "ALL PRODUCTS"}
            </h2>
            <p className="filter-results">{filteredProducts.length} Results</p>
          </div>
          <div className="sort-by-container">
            <p>Sort by:</p>
            <div className="dropdown-select-sort">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A-Z</option>
                <option value="name-z-a">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="products-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">
              <p>No products match your filters.</p>
              <button
                className="clear-filters-btn"
                onClick={() =>
                  setFilters({
                    category: [],
                    origin: [],
                    priceRanges: [],
                    organic: false,
                    inStock: false,
                  })
                }
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
