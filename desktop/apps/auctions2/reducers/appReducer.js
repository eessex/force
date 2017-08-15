import * as types from 'desktop/apps/auctions2/actions/appActions'
import u from 'updeep'

export const initialState = {
  isMobile: false,
  auctions: [],
  isFetchingAuctions: false
}

export default function appReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_AUCTIONS_FAILURE: {
      return u({
        isFetchingAuctions: false
      }, state)
    }
    case types.GET_AUCTIONS_REQUEST: {
      return u({
        isFetchingAuctions: true
      }, state)
    }
    case types.GET_AUCTIONS_SUCCESS: {
      return u({
        isFetchingAuctions: false,
        auctions: state.auctions.concat(action.payload.auctions)
      }, state)
    }
  }
  return state
}
