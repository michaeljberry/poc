<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import NavLink from './NavLink.vue'
import NavLinkMobile from './NavLinkMobile.vue'

const company = [
  { name: 'Snow', href: '#' },
  { name: 'Outdoor', href: '#' },
  { name: 'Water', href: '#' },
  { name: 'Apparel', href: '#' }
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-labelh="Global"
    >
      <div class="pr-8 lg:flex lg:flex-1">
        <a href="#" class="-m-1.5">
          <span class="sr-only">Demo Blog</span>
          <img
            class="h-8 w-auto"
            src="https://demo.dotcms.com/application/themes/travel/images/logo.png"
            alt=""
          />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <NavLink src="https://demo.dotcms.com/" text="Home" :ext="true" target="_blank" />
        <NavLink text="Travel Blog" />
        <NavLink text="Destinations" />
        <Popover class="relative p-[3px]">
          <PopoverButton
            class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          >
            Store
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5"
            >
              <a
                v-for="item in company"
                :key="item.name"
                :href="item.href"
                class="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</a
              >
            </PopoverPanel>
          </transition>
        </Popover>
        <NavLink text="Travelbot" />
        <NavLink text="Members Only" />
        <NavLink text="Contact Us" />
      </PopoverGroup>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Demo Blog</span>
            <img
              class="h-8 w-auto"
              src="https://demo.dotcms.com/application/themes/travel/images/logo.png"
              alt=""
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NavLinkMobile src="https://demo.dotcms.com/" text="Home" />
              <NavLinkMobile text="Travel Blog" />
              <NavLinkMobile text="Destinations" />
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Store
                  <ChevronDownIcon
                    :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                    aria-hidden="true"
                  />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton
                    v-for="item in company"
                    :key="item.name"
                    as="a"
                    :href="item.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >{{ item.name }}</DisclosureButton
                  >
                </DisclosurePanel>
              </Disclosure>
              <NavLinkMobile text="Travelbot" />
              <NavLinkMobile text="Members Only" />
              <NavLinkMobile text="Contact Us" />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
