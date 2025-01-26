const dummyData: {
    users: Record<string, User>;
    categories: Record<
        string,
        { title: string; price: number; quantity: number; imageUrl: string }[]
    >;
} = {
    users: {},
    categories: {
        electronics: [
            { title: 'TV', price: 300, quantity: 10, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 1200, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },
            { title: 'Laptop', price: 700, quantity: 5, imageUrl: '/assets/Naruto.png' },

        ],
        clothing: [
            { title: 'Shirt', price: 20, quantity: 50, imageUrl: '/assets/shirt.jpg' },
            { title: 'Jeans', price: 40, quantity: 30, imageUrl: '/assets/jeans.jpg' },
        ],
    },
};


interface User {
    uid: string;
    email: string;
    password?: string;
    displayName: string;
    createdAt?: Date;
}

interface AdditionalInformation {
    [key: string]: unknown;
}

export const addCollectionAndDocuments = async (
    collectionKey: keyof typeof dummyData,
    objectsToAdd: { title: string; price: number; quantity: number; imageUrl: string }[] 
): Promise<void> => {
    if (collectionKey === 'categories') {
        dummyData.categories = {
            ...dummyData.categories,
            ...objectsToAdd.reduce((acc, obj) => {
                acc[obj.title.toLowerCase()] = [obj];
                return acc;
            }, {} as Record<string, { title: string; price: number; quantity: number; imageUrl: string }[]>),
        };
    } else {
        console.error('Unsupported collection key:', collectionKey);
    }
    console.log(`Collection ${collectionKey} added`, objectsToAdd);
};

export const getCategoriesAndDocuments = async (): Promise<
    Record<string, { title: string; price: number; quantity: number }[]>
> => {
    console.log('Fetched categories:', dummyData.categories);
    return dummyData.categories;
};

let mockCurrentUser: User | null = null;

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalInformation = {}
): Promise<User> => {
    if (!userAuth) {
        throw new Error('User authentication object is required.');
    }

    if (!dummyData.users[userAuth.uid]) {
        dummyData.users[userAuth.uid] = {
            ...userAuth,
            createdAt: new Date(),
            ...additionalInformation,
        };
    }

    console.log('User document created or fetched:', dummyData.users[userAuth.uid]);
    return dummyData.users[userAuth.uid];
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User> => {
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    const uid = `${Date.now()}`;
    const user: User = { uid, email, password, displayName: email.split('@')[0] };
    mockCurrentUser = user;
    await createUserDocumentFromAuth(user);
    console.log('User created with email and password:', user);
    return user;
};

export const signInUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User | null> => {
    const user = Object.values(dummyData.users).find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        mockCurrentUser = user;
        console.log('User signed in:', user);
        return user;
    }

    console.error('Invalid email or password');
    return null;
};

export const signOutUser = async (): Promise<void> => {
    console.log('User signed out:', mockCurrentUser);
    mockCurrentUser = null;
};

export const onAuthStateChangedListener = (callback: (user: User | null) => void): void => {
    setTimeout(() => callback(mockCurrentUser), 1000);
};

export const signInWithGooglePopup = async (): Promise<User> => {
    const user: User = {
        uid: `${Date.now()}`,
        email: 'google.user@example.com',
        displayName: 'Google User',
    };
    mockCurrentUser = user;
    await createUserDocumentFromAuth(user);
    console.log('User signed in with Google Popup:', user);
    return user;
};
