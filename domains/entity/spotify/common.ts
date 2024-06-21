/**
 * ローカルならnull
 */
type StringOrNullIfLocal = string | null

/**
 * コンポーネントで使用するアーティスト情報
 */
export interface SpotifyArtist {
  name: string

  spotifyUrl: StringOrNullIfLocal
}

/**
 * コンポーネントで使用する曲情報
 * 設計簡略化のため、ポッドキャストもこの形式に変換する
 */
export interface SpotifyTrack {
  /** mapした際にkeyで使う */
  id: StringOrNullIfLocal
  name: string
  spotifyUrl: StringOrNullIfLocal
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  durationMilliSeconds: number
  is_local: boolean
}

/**
 * コンポーネントで使用するアルバムジャケット
 */
export interface SpotifyAlbumImage {
  url: string
  height: number
  width: number
}

/**
 * コンポーネントで使用するアルバム
 */
export interface SpotifyAlbum {
  name: string
  spotifyUrl: StringOrNullIfLocal
  image: SpotifyAlbumImage | null
}
