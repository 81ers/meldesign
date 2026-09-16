import projectsJson from './projects.json'

export interface Project {
  id: number
  title: string
  location: string
  type: string
  folder: string
  slug: string
  visible: boolean
  images: string[]
}

export const allProjects = projectsJson as Project[]

/** Sitede ve sitemap'te yalnızca görünür projeler. */
export const projects = allProjects.filter((project) => project.visible)
