import './CheckboxFilter.css';

export default function CheckboxFilter({
  id,
  label,
  count,
  checked,
  onChange
}) {
  return (
    <div className="checkbox-filter">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>
        {label}
        {count !== undefined && <span className="filter-count">({count})</span>}
      </label>
    </div>
  )
}