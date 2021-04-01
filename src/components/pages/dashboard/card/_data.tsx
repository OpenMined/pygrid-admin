import React from 'react'
import {ArrowForward} from '@/components/icons/arrows'
import {TriangleUp, TriangleDown} from '@/components/icons/triangles'

export default [
  {
    title: 'Datasets',
    main: {
      value: 7,
      description: 'datasets'
    },
    items: [
      {
        value: 24,
        description: 'active requests',
        icon: <ArrowForward className="w-3 h-3 text-blue-600" />
      },
      {
        value: 3,
        description: 'tensors pending deletion',
        icon: <ArrowForward className="w-3 h-3 text-blue-600" />
      }
    ]
  },
  {
    title: 'Models',
    main: {
      value: 3,
      description: 'models'
    },
    items: [
      {
        value: 1,
        description: 'active training cycle',
        icon: <ArrowForward className="w-3 h-3 text-blue-600" />
      }
    ]
  },
  {
    title: 'Users',
    main: {
      value: 127,
      description: 'data scientists',
      icon: <TriangleUp className="w-3 h-3 text-green-600" />
    },
    items: [
      {
        value: 4,
        description: 'org-level users',
        icon: <TriangleDown className="w-3 h-3 text-red-600" />
      },
      {
        value: 14,
        description: 'groups',
        icon: <TriangleUp className="w-3 h-3 text-green-600" />
      },
      {
        value: 5,
        description: 'roles',
        icon: <TriangleUp className="w-3 h-3 text-green-600" />
      }
    ]
  }
]
