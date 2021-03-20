import type {NextApiRequest, NextApiResponse} from 'next'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
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
  ])
}
