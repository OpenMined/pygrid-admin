import type {FunctionComponent} from 'react'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {ArrowForward} from '@/components/icons/arrows'

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
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Datasets</h1>
        <button className="btn" onClick={() => alert('Create new dataset')}>
          New dataset
        </button>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">Manage all private data hosted in your node</p>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sections.map(({title, value, text}) => (
          <div key={`section-${title}`}>
            <small className="font-semibold tracking-wide text-gray-800 uppercase">{title}</small>
            <p className="my-3">
              <span className="text-xl font-semibold text-gray-800">{value}</span>{' '}
              <span className="text-gray-400">{text}</span> <ArrowForward className="w-4 h-4 text-blue-600" />
            </p>
          </div>
        ))}
      </section>
      <section className="space-y-6">
        {datasets.map(dataset => (
          <div key={`dataset-${dataset.title}`}>
            <a href={`/datasets/${dataset.title}`}>
              <DatasetCard {...dataset} />
            </a>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Datasets
