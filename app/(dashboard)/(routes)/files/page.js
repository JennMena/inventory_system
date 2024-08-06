import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Files() {
  //OR afterSignOutUrl
  return (
    <div>Files
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  )
}

export default Files