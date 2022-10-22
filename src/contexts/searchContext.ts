// import React, {createContext, useContext, useState} from 'react';

// interface SearchContextValue {
//   keyword: string;
//   onChangeText(keyword: string): void;
// }

// const SearchContext = createContext<SearchContextValue | null>(null);

// export function SearchContextProvider({children}: {children: React.ReactNode}) {
//   const [keyword, onChangeText] = useState<SearchContextValue>();

//   return (
//     // <SearchContext.Provider value={{keyword, onChangeText}}>
//     //   {children}
//     // </SearchContext.Provider>
//   );
// }

// export function useSearch() {
//   const search = useContext(SearchContext);

//   if (!search) {
//     throw new Error('SearchContextProvider is not used');
//   }

//   return search;
// }

// export default SearchContext;
