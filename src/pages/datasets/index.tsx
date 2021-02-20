import {FunctionComponent} from 'react'
import {Section} from '@/components/pages/datasets/sections'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'

const Datasets: FunctionComponent = () => {
  const sections = [
    {title: 'Permissions changes', value: 19, text: 'requests'},
    {title: 'Budget changes', value: 5, text: 'requests'},
    {title: 'Tensors pending deletion', value: 3, text: 'tensors'}
  ]

  const datasets = [
    {
      title: 'Diabetes Study 01.289.301',
      description:
        'This was a double-blind diabetes study done in coordination with UC Santa Barbara between July 1st, 2017 and January 1st, 2019.',
      tags: ['diabetes', 'california', 'healthcare', 'UCSF', 'beekeeper'],
      tensors: 2
    },
    {
      title: 'Dementia MRI Scans (10k)',
      description:
        'Performed a database dump of exactly 10,000 patient records from our EMR. All patients were diagnosed with dementia within 10 years of the MRIs.',
      tags: ['dementia', 'mri', 'healthcare', 'UCSF'],
      tensors: 6
    },
    {
      title: 'Diabetes Study 01.289.301',
      description:
        'This was a double-blind diabetes study done in coordination with UC Santa Barbara between July 1st, 2017 and January 1st, 2019.',
      tags: ['diabetes', 'california', 'healthcare', 'UCSF', 'beekeeper'],
      tensors: 2
    },
    {
      title: 'Dementia MRI Scans (10k)',
      description:
        'Performed a database dump of exactly 10,000 patient records from our EMR. All patients were diagnosed with dementia within 10 years of the MRIs.',
      tags: ['dementia', 'mri', 'healthcare', 'UCSF'],
      tensors: 6
    }
  ]

  return (
    <div>
      <section className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="pr-4">
            <h1 className="text-4xl text-gray-800">Datasets</h1>
            <p className="mt-3 mb-6 text-xl font-light text-gray-400">Manage all private data hosted in your node</p>
          </div>
          <button>New dataset</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {sections.map(section => (
            <Section key={`section-${section.title}`} {...section} />
          ))}
        </div>
        <div className="space-y-6">
          {datasets.map(dataset => (
            <DatasetCard key={`dataset-${dataset.title}`} {...dataset} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Datasets
