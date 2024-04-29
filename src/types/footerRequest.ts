export type IFooter = IFooterItem[]

export interface IFooterItem {
  id: number
  name: string
  sort: number
  pod_menu: PodMenu[]
}

export interface PodMenu {
  id: number
  naim: string
  sort: number
  url: string
}
