export function formatDate(dateString, options) {
  const { format } = new Intl.DateTimeFormat('en-US', options)
  return format(new Date(dateString))
}
