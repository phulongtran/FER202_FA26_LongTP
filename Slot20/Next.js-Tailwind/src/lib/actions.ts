
import { createAction } from '@reduxjs/toolkit';
import type { PersistedState } from '@/lib/persist';


// Dispatch một lần sau khi ứng dụng được mount
export const hydrate = createAction<PersistedState>('app/hydrate');
