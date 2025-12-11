import React from 'react'

const Biography = ({title}) => {
  return (
    <>
    <section>
      <div className='text-center m-auto w-250'>
        <h2 className='font-semibold text-xl mb-5'>{title}</h2>
        <p className='m-auto '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae perferendis ut tempora. Quaerat nemo itaque recusandae saepe eaque incidunt, iste voluptate minus! Saepe non, debitis commodi eius tenetur dicta?</p>
      </div>
    </section>
    </>
  )
}

export default Biography