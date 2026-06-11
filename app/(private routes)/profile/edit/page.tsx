import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import EditPage from './EditPage.Client';
import { getMe } from '@/lib/api/serverApi';

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditPage />
    </HydrationBoundary>
  );
};

export default Page;
