import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterModal } from '../../components/FilterModal/FilterModal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  selectedStatus: '',
  selectedGender: '',
  onStatusChange: vi.fn(),
  onGenderChange: vi.fn(),
  onApply: vi.fn(),
  onClear: vi.fn(),
}

describe('FilterModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open', () => {
    render(<FilterModal {...defaultProps} />)
    
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Gender')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<FilterModal {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Filters')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterModal {...defaultProps} />)
    
    const closeButton = screen.getByText('×')
    await user.click(closeButton)
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onStatusChange when status option is selected', async () => {
    const user = userEvent.setup()
    render(<FilterModal {...defaultProps} />)
    
    const aliveOption = screen.getByLabelText('Alive')
    await user.click(aliveOption)
    
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith('Alive')
  })

  it('calls onApply when Apply button is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterModal {...defaultProps} />)
    
    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)
    
    expect(defaultProps.onApply).toHaveBeenCalledTimes(1)
  })

  it('calls onClear when Clear All button is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterModal {...defaultProps} />)
    
    const clearButton = screen.getByText('Clear All')
    await user.click(clearButton)
    
    expect(defaultProps.onClear).toHaveBeenCalledTimes(1)
  })
})