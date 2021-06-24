import {useMemo} from 'react'
import {useQuery} from 'react-query'
import {entityColors} from '@/utils'
import {getLayout} from '@/layouts/blank'
import {DashboardCards, LatestAssetsList} from '@/components/pages/dash'
import {Sidebar} from '@/components/sidebar'
import {AdjustmentsIcon, BookOpenIcon, DatabaseIcon, UsersIcon} from '@heroicons/react/outline'
import type {Tensor, Dataset, Model} from '@/types/grid-types'

interface DashReq {
  [k: string]: number
}

export default function Dashboard() {
  const {data: dashboard} = useQuery<DashReq>('/dashboard')
  const {data: datasets = []} = useQuery<Dataset[]>('/data-centric/datasets')
  const {data: models = []} = useQuery<Model[]>('/data-centric/models')
  const {data: tensors = []} = useQuery<Tensor[]>('/data-centric/tensors')
  const latestAdditions = useMemo(() => ({datasets, models, tensors}), [datasets, models, tensors])

  return (
    <article className="h-screen md:flex overflow-hidden max-w-7xl justify-self-center mx-auto">
      <Sidebar />
      <main className="w-full h-full p-4 px-8 space-y-8 md:space-y-12">
        <header className="h-16">
          <h1 className="text-3xl">Dashboard</h1>
          <p>Welcome to your pygrid node</p>
        </header>
        <section>
          <div>
            <DashboardCards
              cards={[
                {
                  link: '/users',
                  bgColor: entityColors.user,
                  icon: UsersIcon,
                  main: 'Total registered users',
                  value: dashboard ? dashboard.commonUsers + dashboard.orgUsers : undefined
                },
                {
                  link: '/requests',
                  bgColor: entityColors.request,
                  icon: BookOpenIcon,
                  main: 'Pending data requests',
                  value: dashboard?.requests
                },
                {
                  link: '/datasets',
                  bgColor: entityColors.dataset,
                  icon: DatabaseIcon,
                  main: 'Datasets available',
                  value: dashboard?.datasets
                },
                {
                  link: '/models',
                  bgColor: entityColors.model,
                  icon: AdjustmentsIcon,
                  main: 'Models available',
                  value: models?.length
                }
              ]}
            />
          </div>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-medium">Latest assets</h2>
          <div className="border border-gray-200 overflow-hidden rounded-md">
            {/* search box */}
            <LatestAssetsList {...latestAdditions} />
          </div>
        </section>
      </main>
    </article>
  )
}

Dashboard.getLayout = getLayout
