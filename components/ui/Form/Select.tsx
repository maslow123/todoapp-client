import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { listCategory } from 'services/categories'
import { ListCategoryResponse } from 'services/types/categories'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Select({ handleChange }) {
  
  useEffect(() => {
      async function fetchData() {
          const categories = await listCategory();
          setCategoryList(categories);
          setLoading(false);
      };

      fetchData();
  }, []);
  const [categoryList, setCategoryList] = useState<ListCategoryResponse[] | ListCategoryResponse>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Listbox 
        value={selected} 
        onChange={(e) => {
            setSelected(e);
            handleChange(e);
        }}
    >
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate">{selected?.name || 'Pilih Kategori'}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {!loading && Array.isArray(categoryList) && categoryList?.length > 0 && categoryList.map((c) => (
                  <Listbox.Option
                    key={c.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={c}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span  className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {c.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}