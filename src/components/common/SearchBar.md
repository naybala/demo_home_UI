# SearchBar Component

## Overview

A reusable search component that can be used across different features in the application.

## Location

`/src/components/common/SearchBar.tsx`

## Props

| Prop                | Type                      | Required | Default       | Description                                                |
| ------------------- | ------------------------- | -------- | ------------- | ---------------------------------------------------------- |
| `searchValue`       | `string`                  | Yes      | -             | Current value of the search input                          |
| `onSearchChange`    | `(value: string) => void` | Yes      | -             | Callback when search input changes                         |
| `onSearch`          | `() => void`              | Yes      | -             | Callback when search button is clicked or Enter is pressed |
| `onClear`           | `() => void`              | No       | -             | Callback when clear button is clicked                      |
| `placeholder`       | `string`                  | No       | `"Search..."` | Placeholder text for the input                             |
| `isLoading`         | `boolean`                 | No       | `false`       | Shows loading spinner in button when true                  |
| `showClearButton`   | `boolean`                 | No       | `false`       | Shows/hides the clear button                               |
| `currentSearchTerm` | `string`                  | No       | -             | Displays current search term below the input               |
| `disabled`          | `boolean`                 | No       | `false`       | Disables the entire search bar                             |

## Features

- ✅ **Enter Key Support** - Press Enter to trigger search
- ✅ **Loading State** - Shows spinner and "Searching..." text
- ✅ **Clear Button** - Optional clear button with callback
- ✅ **Current Search Display** - Shows active search term
- ✅ **Dark Mode Support** - Fully styled for dark mode
- ✅ **Disabled State** - Can be disabled during loading or other operations
- ✅ **Responsive Design** - Works on all screen sizes

## Usage Example

### Basic Usage

\`\`\`tsx
import SearchBar from "@/components/common/SearchBar";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function MyComponent() {
const router = useRouter();
const searchParams = useSearchParams();
const [searchInput, setSearchInput] = useState("");
const [isSearching, setIsSearching] = useState(false);

const handleSearch = () => {
const params = new URLSearchParams(searchParams.toString());
if (searchInput.trim()) {
params.set("search", searchInput.trim());
} else {
params.delete("search");
}
router.push(\`?\${params.toString()}\`);
};

const handleClear = () => {
setSearchInput("");
router.push(window.location.pathname);
};

return (
<SearchBar
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      onSearch={handleSearch}
      onClear={handleClear}
      placeholder="Search items..."
      isLoading={isSearching}
      showClearButton={!!searchInput}
    />
);
}
\`\`\`

### With Current Search Term Display

\`\`\`tsx
<SearchBar
  searchValue={searchInput}
  onSearchChange={setSearchInput}
  onSearch={handleSearch}
  onClear={handleClear}
  placeholder="Search properties..."
  isLoading={isSearching}
  showClearButton={!!currentSearch}
  currentSearchTerm={currentSearch}
/>
\`\`\`

## Integration with TanStack Query

When using with TanStack Query, use `isFetching` to detect loading state during search changes:

\`\`\`tsx
const { data, isFetching, isFetchingNextPage } = useInfiniteQuery({
// ... query config
});

// Use isFetching to detect loading during search changes
const isSearching = isFetching && !isFetchingNextPage;

<SearchBar
searchValue={searchInput}
onSearchChange={setSearchInput}
onSearch={handleSearch}
isLoading={isSearching} // ← Use isSearching here
// ... other props
/>
\`\`\`

## Styling

The component uses Tailwind CSS classes and follows the application's design system:

- Primary color: `#2D4356`
- Dark mode support with `dark:` variants
- PrimeIcons for icons (`pi-search`, `pi-times`, `pi-filter`, `pi-spinner`)

## Accessibility

- Input is keyboard accessible
- Enter key triggers search
- Disabled states are properly handled
- Loading states provide visual feedback
