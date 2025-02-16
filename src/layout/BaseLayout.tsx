import {Outlet} from 'react-router-dom'
import {
  ImagesIcon as HeaderIcon,
  FolderGit2Icon as GithubIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Button} from '@/components/ui/button'
import {BreadcrumbList} from '@/components/breadcrumb-list'
import {SearchDialog} from '@/components/search-dialog'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useGithubRateLimitStore} from '@/stores/githubApiStore'
import {useSearchDialogStore} from '@/stores/searchDialogStore'
import {cn} from '@/lib/utils'

const underlineHoverAnimation = cn(
  'relative',
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full',
)

export default function BaseLayout() {
  const [{owner, repo, ref}] = useTargetRepository()
  const {limit, remaining} = useGithubRateLimitStore()
  const {open: openSearchDialog} = useSearchDialogStore()

  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
        <header
          data-slot="header"
          className={cn(
            'flex justify-between items-center align-middle',
            'w-full min-h-8 px-4 py-2',
            'shadow-xs shadow-neutral-800',
          )}>
          <div data-slot="header-title" className="flex items-center gap-2">
            <HeaderIcon strokeWidth={3} />
            {!owner || !repo ? (
              <b className="select-none">repo-image-viewer</b>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:cursor-pointer">
                  <BreadcrumbList
                    items={[owner, repo, ref]}
                    className="text-nowrap"
                    separator={<span className="text-neutral-500">/</span>}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a
                      href={`https://github.com/${owner}/${repo}${ref ? `/tree/${ref}` : ''}`}
                      target="_blank"
                      rel="noreferrer">
                      View on GitHub
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button variant="ghost" onClick={openSearchDialog}>
                      Open New Repository
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div
            data-slot="header-side"
            className="flex items-center gap-2"></div>
        </header>

        <Outlet />

        <footer className="my-4 flex w-full items-center justify-center gap-0.5 text-xs text-neutral-400">
          <GithubIcon className="size-4" />
          <a
            href="https://github.com/PresentKim"
            target="_blank"
            rel="noopener noreferrer"
            className={underlineHoverAnimation}>
            PresentKim
          </a>
          <p>/</p>
          <a
            href="https://github.com/PresentKim/repo-image-viewer"
            target="_blank"
            rel="noopener noreferrer"
            className={underlineHoverAnimation}>
            repo-image-viewer
          </a>
          <div
            aria-label="Github API rate limit"
            className="fixed text-xs right-2 bottom-2 select-none">
            <span aria-label="Github API rate limit remaining">
              {remaining}
            </span>
            <span>/</span>
            <span aria-label="Github API rate limit limit">{limit}</span>
          </div>
        </footer>
      </div>

      <SearchDialog />
    </>
  )
}
