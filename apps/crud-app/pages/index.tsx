import { Breadcrumb } from '@proximity-crud-application/ui';
import type { BreadCrumbList } from '../types/types';

const DASHBOARD: Array<BreadCrumbList> = [
  {
    id: 1,
    isSelected: false,
    name: "Home",
    url: "/"
  },
  {
    id: 2,
    isSelected: true,
    name: "Dashboard",
    url: "/"
  },
]

export function Index() {
  return (
    <div>
      <Breadcrumb menuList={DASHBOARD} />
    </div>
  );
}

export default Index;
