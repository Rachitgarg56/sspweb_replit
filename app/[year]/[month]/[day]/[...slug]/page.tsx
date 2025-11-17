import ClientRedirect from "./client-redirect"

interface Props {
  params: Promise<{
    year: string
    month: string
    day: string
    slug: string[]
  }>
}

export default async function DateSlugPage({ params }: Props) {
  const { year, month, day, slug } = await params
  const fullPath = [year, month, day, ...slug].join("/")

  return <ClientRedirect fullPath={fullPath} />
}
