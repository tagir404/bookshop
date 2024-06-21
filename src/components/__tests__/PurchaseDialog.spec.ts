import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useDialogStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'
import PurchaseDialog from '@/components/PurchaseDialog.vue'

describe('PurchaseDialog', () => {
    setActivePinia(createPinia())
    const dialogStore = useDialogStore()

    const wrapper = mount(PurchaseDialog)

    it('not exists by default', () => {
        expect(wrapper.find('[data-test="dialog-container"]').exists()).toBeFalsy()
    })

    it('exists when state is true', async () => {
        dialogStore.isOpen = true

        await wrapper.vm.$nextTick()

        expect(wrapper.find('[data-test="dialog-container"]').exists()).toBeTruthy()
    })
})
