export type ModuleDTO = {
  content_count: number
  id: number
  module_description: string
  module_name: string
  contents: ContentDTO[]
}

export type ContentDTO = {
  id: number
  contents_name: string
  contents_type: string
  contents_video_url: string
  contets_duration: number,
  contents_article?: string | null
}