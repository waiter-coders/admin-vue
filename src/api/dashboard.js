import service from '@/utils/service'
export const getMenus = () => {
  return service.get('/dashboard/getMenus')
}
