import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange
} from 'urql';

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
})

export { client, ssrCache }