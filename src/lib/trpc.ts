import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/lib/routers'; // Assuming routers.ts defines your AppRouter

export const trpc = createTRPCReact<AppRouter>();
