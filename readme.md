If you choose to implement these user restrictions in your application’s logic, you
need to override the following methods: isAccountNonExpired(), isAccountNonLocked(), isCredentialsNonExpired(), isEnabled(), such that those
needing to be enabled return true. Not all applications have accounts that expire or
get locked with certain conditions. If you do not need to implement these functionalities in your application, you can simply make these four methods ret