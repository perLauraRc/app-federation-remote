export interface GalleryCellProps {
  children: React.ReactNode
  description?: string
  title?: string
}

const gridCellClassName =
  'relative w-1/3 aspect-3/2 flex items-center justify-center border-1 border-gray-900 dark:border-powder-blue pt-6 pr-8 pb-6 pl-8'
const gridCellContentClassName =
  'absolute z-gridCellHovered left-0 top-0 flex items-center justify-center pt-6 pr-8 pb-6 pl-8 -inset-1 -skew-y-4 scale-103 font-roboto font-bold text-[1rem]/1 lg:text-[1.5rem]/8 text-gray-900 dark:text-gray-200 -tracking-normal bg-gradient-to-r from-byzantium to-prussian-blue transition duration-300 ease-in-out opacity-0 hover:opacity-95'

const GalleryCell = ({ children, description, title }: GalleryCellProps) => {
  const showLayerDetailsOnHover = description && title

  return (
    <div className={gridCellClassName}>
      {showLayerDetailsOnHover && (
        <div className={gridCellContentClassName}>
          {description && title && `${title.toUpperCase()} :: ${description}`}
        </div>
      )}
      {children}
    </div>
  )
}

export default GalleryCell
