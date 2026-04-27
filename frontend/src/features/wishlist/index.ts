// Feature exports - Barrel pattern for clean imports
export { useWishlist } from "./hooks/use-wishlist";
export { WishlistService } from "./services/wishlist-service";
export { WishlistMapper } from "./mappers/wishlist-mapper";
export { WishlistApiContract } from "./contracts/api-contract";
export type { WishlistRead } from "./types/wishlist-read";
export { WishlistFormValues, WishlistApiSchema, WishlistDefaultValues } from "./contracts/api-schema";

// Components
export { WishlistList } from "./components/wishlist-list";
