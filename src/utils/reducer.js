import {reducerCases} from './Constants'

export const initialState = {
  token: null,
  playlists : [],
  userInfo : null,
  selectedPlaylistId : "0TlCZCZm7xtTHeh5Zy2tCe",
  selectedPlaylist : null,
  currentTrack : null,
  player_state : null
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN : {
      return {...state , token : action.token};
    }
    case reducerCases.SET_PLAYLISTS : {
      return {...state, playlists : action.playlists}
    }
    case reducerCases.SET_USER : {
      return {...state , userInfo : action.userInfo}
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist : action.selectedPlaylist
      }
    }
    case reducerCases.SET_PLAYING : {
        return {
          ...state , 
          currentTrack : action.currentTrack
        }
    }
    case reducerCases.SET_PLAYER_STATE : {
      return {
        ...state , 
        player_state : action.player_state
      }
  }
    default:
      return state;
  }
};

export default reducer;
