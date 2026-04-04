package db

type Storage struct {
	UserRepo UserRepository
}

func NewStorage() *Storage {
	return &Storage{
		UserRepo: &UserRepositoryImpl{},
	}
}
