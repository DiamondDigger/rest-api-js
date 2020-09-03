import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('loader', {
    template:
        `
    <div style="display: flex; justify-content: center; align-items: center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
`
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: [],
        }
    },
    computed: {
        canCreate() {
            return this.form.name.trim() && this.form.value.trim()
        }
    },
    methods: {
        async createContact() {
            const {...contact} = this.form

            const newContact = await request('http://localhost:3000/api/contacts', 'POST', contact)
            this.contacts.push(newContact)

            this.form.name = this.form.value = ''
        },
        async markContact(id) {
            let contact = this.contacts.find(c => c.id === id)
            const updatedContact = await request(`http://localhost:3000/api/contacts/${id}`, 'PUT', {
                ...contact, marked: true
            })
            contact.marked = updatedContact.marked
        },
        async deleteContact(id) {
            await request(`http://localhost:3000/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    },
    async mounted(){
        this.loading = true
        console.log('Start loading - ', this.loading)
        this.contacts = await request('http://localhost:3000/api/contacts')
        console.log(this.contacts)
        this.loading = false
        console.log('End loading, loading  - ', this.loading)
    }
})

async function request(url, method = 'GET', data = null){
    try{
        const headers = {}
        let body

        if(data){
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });
        return await response.json()
    } catch(e){
        console.warn('Error:', e.message)
    }
}