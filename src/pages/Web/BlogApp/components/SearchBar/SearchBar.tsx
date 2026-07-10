    import styles from './SearchBar.module.css'

    interface SearchBarProps {
    searchTerm: string
    onSearch: (term: string) => void
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
    }

    const SearchBar = ({ searchTerm, onSearch, categories, selectedCategory, onCategoryChange }: SearchBarProps) => {
    return (
        <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
            />
        </div>
        <div className={styles.categories}>
            {categories.map((cat) => (
            <button
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => onCategoryChange(cat)}
            >
                {cat}
            </button>
            ))}
        </div>
        </div>
    )
    }

    export default SearchBar