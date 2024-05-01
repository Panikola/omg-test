import { reactive } from 'vue'
import { StoreService } from "../services/StoreService.ts";

const store = reactive({
    visibleSquares: <string[]>[],
    randomVisibleSquareInEachRow: <Record<string, string>>{},
    randomNumberForSquare: <Record<string, number>>{},
})

export const storeService = new StoreService(store)