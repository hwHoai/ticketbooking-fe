import { createContext } from 'react';

export const ticketInfoContext = createContext({
  ticketId: null,
  ticketType: null
});
