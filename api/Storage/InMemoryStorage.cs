
public class InMemoryStorage : IStorage
{
    private List<Contact> Contacts { get; set; }

    public InMemoryStorage()
    {
        this.Contacts = new List<Contact>();

        for (int i = 0; i < 5; i++)
        {
           this.Contacts.Add(new Contact()
           {
               Id = i,
               Name = $"Полное имя {i}",
               Email = $"{Guid.NewGuid().ToString().Substring(0, 5)}_{i}@ksergey.ru"
           });

        }
    }

    public List<Contact> GetContacts()
    {
        return Contacts;
    }

    public Contact Add(Contact contact)
    {
        if (Contacts.Select(x => x.Id).Contains(contact.Id)) return null;
        Contacts.Add(contact);
        return contact;
    }

    public bool Remove(int id)
    {
        Contact contact;
        for (int i = 0; i < Contacts.Count; i++)
        {
            if (Contacts[i].Id == id)
            {
                contact = Contacts[i];
                Contacts.Remove(contact);
                return true;
            }
        }
        return false;
    }

    public bool UpdateContact(ContactDto contactDto, int id)
    {
        Contact contact;
        for (int i = 0; i < Contacts.Count; i++)
        {
            if (Contacts[i].Id == id)
            {
                contact = Contacts[i];
                if (!String.IsNullOrEmpty(contactDto.Email))
                {
                    contact.Email = contactDto.Email;
                }
                if (!String.IsNullOrEmpty(contactDto.Name))
                {
                    contact.Name = contactDto.Name;
                }
                return true;
            }
        }
        return false;
    }
}